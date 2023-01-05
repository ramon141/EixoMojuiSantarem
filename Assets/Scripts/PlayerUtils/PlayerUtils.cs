using System;
using System.Threading;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class PlayerUtils : MonoBehaviour
{
    public static void killPlayer(MonoBehaviour mb, GameObject gameObject)
    {
        gameObject.GetComponent<Animator>().SetTrigger("Dead");
        gameObject.GetComponent<CapsuleCollider2D>().enabled = false;
        gameObject.GetComponent<Player>().enabled = false;
        gameObject.GetComponent<Animator>().SetBool("Jump", false);
        mb.Invoke("ReloadScene", 2f);
    }

}
